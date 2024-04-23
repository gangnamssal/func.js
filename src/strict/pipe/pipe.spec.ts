import filter from '../filter/filter';
import map from '../map/map';
import reduce from '../reduce/reduce';
import pipe from './pipe';

describe('Pipe', () => {
  it('인수가 하나만 주어질 때', () => {
    const f = pipe<number, number>(
      a => a + 1,
      a => a + 10,
      a => a + 100,
    );

    expect(f(0)).toBe(111);
  });

  it('인수가 두 개 주어질 때', () => {
    const f = pipe<number, number>(
      (a, b) => a + b,
      a => a + 10,
      a => a + 100,
    );

    expect(f(1, 2)).toBe(113);
  });

  it('pipe 활용', () => {
    const f = pipe<number[], number>(
      a => map((a: number) => a + 1, a),
      a => filter((a: number) => a % 2, a),
      a => reduce<number, number>((a, b) => a + b, a),
    );

    expect(f([1, 2, 3, 4, 5])).toBe(8);
  });

  it('pipe 활용2', () => {
    const f = pipe<number[], number>(a => reduce<number, number>((a, b) => a + b, a));

    expect(f([1, 2, 3, 4, 5])).toBe(15);
  });
});