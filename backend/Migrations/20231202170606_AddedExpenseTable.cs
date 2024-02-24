using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace feicount.Migrations
{
    /// <inheritdoc />
    public partial class AddedExpenseTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Amount = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SpenderUserId = table.Column<int>(type: "integer", nullable: false),
                    FeicountId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Expenses_Feicounts_FeicountId",
                        column: x => x.FeicountId,
                        principalTable: "Feicounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExpenseUser",
                columns: table => new
                {
                    ExpensesId = table.Column<int>(type: "integer", nullable: false),
                    RecipientsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpenseUser", x => new { x.ExpensesId, x.RecipientsId });
                    table.ForeignKey(
                        name: "FK_ExpenseUser_Expenses_ExpensesId",
                        column: x => x.ExpensesId,
                        principalTable: "Expenses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExpenseUser_Users_RecipientsId",
                        column: x => x.RecipientsId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_FeicountId",
                table: "Expenses",
                column: "FeicountId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseUser_RecipientsId",
                table: "ExpenseUser",
                column: "RecipientsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExpenseUser");

            migrationBuilder.DropTable(
                name: "Expenses");
        }
    }
}
