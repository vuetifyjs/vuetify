const delta = 0.20689655172413793 // 6÷29

const cielabForwardTransform = t => (
  t > delta ** 3
    ? Math.cbrt(t)
    : (t / (3 * delta ** 2)) + 4 / 29
)

const cielabReverseTransform = t => (
  t > delta
    ? t ** 3
    : (3 * delta ** 2) * (t - 4 / 29)
)

export function fromXYZ (xyz) {
  const transform = cielabForwardTransform
  const transformedY = transform(xyz[1])

  return [
    116 * transformedY - 16,
    500 * (transform(xyz[0] / 0.95047) - transformedY),
    200 * (transformedY - transform(xyz[2] / 1.08883))
  ]
}

export function toXYZ (lab) {
  const transform = cielabReverseTransform
  const Ln = (lab[0] + 16) / 116
  return [
    transform(Ln + lab[1] / 500) * 0.95047,
    transform(Ln),
    transform(Ln - lab[2] / 200) * 1.08883
  ]
}
