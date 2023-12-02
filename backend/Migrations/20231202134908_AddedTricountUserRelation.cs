using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tricount.Migrations
{
    /// <inheritdoc />
    public partial class AddedTricountUserRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TricountUser",
                columns: table => new
                {
                    TricountsId = table.Column<int>(type: "integer", nullable: false),
                    UsersId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TricountUser", x => new { x.TricountsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_TricountUser_Tricounts_TricountsId",
                        column: x => x.TricountsId,
                        principalTable: "Tricounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TricountUser_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TricountUser_UsersId",
                table: "TricountUser",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TricountUser");
        }
    }
}
