using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aura_Core.Migrations
{
    /// <inheritdoc />
    public partial class ADdLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                schema: "aura",
                table: "RegularUserDetails");

            migrationBuilder.DropColumn(
                name: "PreferredLanguage",
                schema: "aura",
                table: "RegularUserDetails");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                schema: "aura",
                table: "ProviderUserDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                schema: "aura",
                table: "ProviderUserDetails");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                schema: "aura",
                table: "RegularUserDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PreferredLanguage",
                schema: "aura",
                table: "RegularUserDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
