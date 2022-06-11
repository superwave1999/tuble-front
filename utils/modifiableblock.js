export function isBlockModifiable(block) {
  return !['e', 's'].includes(block.Type) && !block.Connections.includes(-1)
}
