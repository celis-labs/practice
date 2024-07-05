export const formatSalary = (min_salary: number, max_salary: number, currency: string, payment_category: string) => {
    if (min_salary && max_salary && min_salary !== max_salary) {
        return `${min_salary} – ${max_salary} ${currency} ${payment_category}`;
    } else if (min_salary) {
        return `от ${min_salary} ${currency} ${payment_category}`;
    } else if (max_salary) {
        return `до ${max_salary} ${currency} ${payment_category}`;
    } else {
        return 'Зарплата не указана';
    }
}