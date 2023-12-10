using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tricount.Migrations
{
    /// <inheritdoc />
    public partial class AddedExpenseSpenderAsUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpenderUserId",
                table: "Expenses",
                newName: "SpenderId");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_SpenderId",
                table: "Expenses",
                column: "SpenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_Users_SpenderId",
                table: "Expenses",
                column: "SpenderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_Users_SpenderId",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_SpenderId",
                table: "Expenses");

            migrationBuilder.RenameColumn(
                name: "SpenderId",
                table: "Expenses",
                newName: "SpenderUserId");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
