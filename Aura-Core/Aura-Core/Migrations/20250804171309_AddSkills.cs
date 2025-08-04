using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aura_Core.Migrations
{
    /// <inheritdoc />
    public partial class AddSkills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AvatarUrl",
                schema: "aura",
                table: "ProviderUserDetails",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "Skills",
                schema: "aura",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProviderSkills",
                schema: "aura",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SkillId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProviderSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProviderSkills_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "aura",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProviderSkills_Skills_SkillId",
                        column: x => x.SkillId,
                        principalSchema: "aura",
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProviderSkills_SkillId",
                schema: "aura",
                table: "ProviderSkills",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_ProviderSkills_UserId",
                schema: "aura",
                table: "ProviderSkills",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProviderSkills",
                schema: "aura");

            migrationBuilder.DropTable(
                name: "Skills",
                schema: "aura");

            migrationBuilder.AlterColumn<string>(
                name: "AvatarUrl",
                schema: "aura",
                table: "ProviderUserDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
