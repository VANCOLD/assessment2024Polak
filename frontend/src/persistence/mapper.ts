import type { ProjectDto } from "./ProjectDto";
import type { ProjectDisplayDto } from "./ProjectDisplayDto"

export function mapToProjectDisplay(dto: ProjectDto): ProjectDisplayDto {
    return {
        id: dto.id,
        name: dto.name,
        beschreibung: dto.beschreibung,
        projektleiter: dto.projektleiter,
    };
}