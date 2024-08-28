export type FindOptionsWhere<Entity> = {
    [P in keyof Entity]?: Entity[P]
}