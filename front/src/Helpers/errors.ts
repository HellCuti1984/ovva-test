export default function errorsToString(errors: any) {
    if (typeof errors == 'object')
        return Object.entries(errors).map(([k, v]) => `${v}\n`);
    else
        return errors
}