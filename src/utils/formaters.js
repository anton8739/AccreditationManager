import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export const dateFormat1 = (date) => {
    const localDate = new Date(date)
    const ex = "17 Сент 2021 • 13:29"
    const monthArray = [
        'января', 'февраля', 'марта',
        'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября',
        'октября', 'ноября', 'декабря'
    ]
    const hours = localDate.getHours() > 10 ? localDate.getHours() : `0${localDate.getHours()}`
    const min = localDate.getMinutes() > 10 ? localDate.getMinutes() : `0${localDate.getMinutes()}`
    const formatDate = `${localDate.getDate()} ${monthArray[localDate.getMonth()]} ${localDate.getFullYear()} • ${hours}:${min}`;
    return formatDate
}
export const getImageUrl = (img) => {
    return `${window.location.origin}`+ img;
}

export const dateFormat2 = (date) => {
    return moment(date).subtract(10, 'days').calendar();
}
export const downloadPdf = async (id) => {
    const domElement = document.querySelector(`#${id}`)
    const pdf = new jsPDF('p', 'pt', [ 595.28,  841.89])
    const canvas = await html2canvas(domElement)
    const img = canvas.toDataURL('image/jpeg')
    pdf.addImage(img, 'JPEG', 50,50, 200,300)
    pdf.save('result.pdf')
}
export const printPdf = async (id) => {
    const domElement = document.querySelector(`#${id}`)
    const pdf = new jsPDF('p', 'pt', [ 595.28,  841.89])
    const canvas = await html2canvas(domElement)
    const img = canvas.toDataURL('image/jpeg')
    pdf.addImage(img, 'JPEG', 50,50, 200,300)
    pdf.autoPrint()
    pdf.output('dataurlnewwindow');
}