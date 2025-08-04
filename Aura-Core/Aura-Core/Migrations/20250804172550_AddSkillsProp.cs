using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aura_Core.Migrations
{
    /// <inheritdoc />
    public partial class AddSkillsProp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Status",
                schema: "aura",
                table: "Skills",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                schema: "aura",
                table: "Skills");
        }
    }
}
