// @flow

export default function echo(args: Array<string>): string {
    return args.slice(1).join(' ');
}
