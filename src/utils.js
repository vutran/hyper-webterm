// @flow

export function camelize(value: string): string {
    return value.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());
}

export function pascalize(value: string): string {
    return value.substr(0, 1).toUpperCase() + camelize(value.substr(1));
}
