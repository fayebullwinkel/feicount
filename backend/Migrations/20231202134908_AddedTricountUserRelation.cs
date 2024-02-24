using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace feicount.Migrations
{
    /// <inheritdoc />
    public partial class AddedFeicountUserRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FeicountUser",
                columns: table => new
                {
                    FeicountsId = table.Column<int>(type: "integer", nullable: false),
                    UsersId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeicountUser", x => new { x.FeicountsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_FeicountUser_Feicounts_FeicountsId",
                        column: x => x.FeicountsId,
                        principalTable: "Feicounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FeicountUser_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeicountUser_UsersId",
                table: "FeicountUser",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeicountUser");
        }
    }
}
