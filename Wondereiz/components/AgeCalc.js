export default function AgeCalculator(dOb) {
    let birthDate = (new Date(dOb.seconds*1000)); 
    let month_diff = Date.now() - birthDate.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age_now = Math.abs(year - 1970);

    return age_now;
}