export class AOC<T extends any = any> {
  day!: string;
  part1(value: T) {}
  part2?(value: T) {}
  runnerParser(value: string) {}
}
