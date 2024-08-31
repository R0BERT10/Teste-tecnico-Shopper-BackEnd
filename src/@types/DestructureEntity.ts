export type DestructureEntity<Entity> = {
    [P in keyof Entity]?: Entity[P]
}