import filterByRecord from './filter-by-record';
import sortRecordKeys from './sort-record-keys';

const DEFAULT_DEPTH = 1;
const DEPTH_INCREMENT = 1;

export default function mapObjectToDependencyArray<T extends object>(
  obj: T,
): unknown[] {
  function createPrefixedDependencyArray<U extends object>(
    objInner: U,
    depth: number,
    prefix: string,
  ): unknown[] {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const keys: (keyof U)[] = Object.keys(objInner) as (keyof U)[];
    keys.sort(sortRecordKeys);

    const dependencies: unknown[] = [];
    for (const key of keys) {
      const keyStr: string = key.toString();
      dependencies.push(`${prefix}.${depth}.${keyStr}`);

      const value: U[keyof U] = objInner[key];
      if (filterByRecord(value)) {
        const newDependencies: unknown[] = createPrefixedDependencyArray(
          value,
          depth + DEPTH_INCREMENT,
          `${prefix}.${depth}.${keyStr}`,
        );
        dependencies.push(...newDependencies);
      } else {
        dependencies.push(value);
      }
    }

    return dependencies;
  }

  return createPrefixedDependencyArray(obj, DEFAULT_DEPTH, 'root');
}
