export class Dates {

    static FORMAT_DAY(day: string) {
        let days_to_format = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let return_day_format = day;
        if (days_to_format.includes(day)) return_day_format = '0' + day;

        return return_day_format;
    }

    static FORMAT_MONTH(month: string) {
        let months_to_format = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let return_month_format = month;
        if (months_to_format.includes(month)) return_month_format = '0' + month;

        return return_month_format;
    }

    static RE_FORMAT_MONTH(month: string): number {
        let months_to_format = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
        let return_month_format = month;
        if (months_to_format.includes(month)) return_month_format = month.replace('0', '');

        return parseInt(return_month_format);
    }

    static FORMAT_DATE_FR_TO_EN(date: string) {

        let return_date_format = '';
        let nums_to_format = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let date_to_format = date.split('/');
        let day = date_to_format[0];
        let month = date_to_format[1];

        if (nums_to_format.includes(day)) day = '0' + day;
        if (nums_to_format.includes(month)) month = '0' + month;

        return_date_format = date_to_format[2] + '-' + month + '-' + day;

        return return_date_format;
    }
}