using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class initials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Email", "firstName" },
                values: new object[] { " Mamta@826@gmail.com", "Mamta" });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "Email", "LastName", "PhoneNumber", "firstName" },
                values: new object[,]
                {
                    { 2, " MamtaRai826@gmail.com", " Rai", 452262502, "Mamta" },
                    { 3, " TusharRai826@gmail.com", " Rai", 452262502, "Tushar" },
                    { 4, " Nagarai826@gmail.com", " Rai", 452262502, "Naga" },
                    { 5, " Rajurai826@gmail.com", " Rai", 452262502, "raju" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Email", "firstName" },
                values: new object[] { " Vineetrai826@gmail.com", "Vineet" });
        }
    }
}
