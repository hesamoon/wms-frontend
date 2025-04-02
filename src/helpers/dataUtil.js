const monthName = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

const convertMonthNum2MonthName = (num) => monthName[num];

const dateFormatter = (date) => {
  const pDate = date.toLocaleDateString("fa-IR");
  const eDate = p2e(pDate);
  const customFormat = `${pDate.split("/")[2]} ${convertMonthNum2MonthName(
    +eDate.split("/")[1] - 1
  )}`;

  return customFormat;
};

export { p2e, dateFormatter, convertMonthNum2MonthName };
