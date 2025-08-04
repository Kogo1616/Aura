using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aura_Core.Migrations
{
    /// <inheritdoc />
    public partial class skillId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SkillId",
                schema: "aura",
                table: "Skills",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SkillId",
                schema: "aura",
                table: "Skills");
        }
    }
}
