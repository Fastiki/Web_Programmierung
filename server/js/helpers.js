//helper functions
function sortByDate(array) {
    return array.sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))
}

function getDatetime() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1; // January is 0
    const day = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedDate
}

function chooseNRandomWithoutReplacement(arr, n) {
    let copy = [...arr];
    let result = [];
    if (n > arr.length) {
        return arr
    }
    while (n--) {
        let index = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(index, 1)[0]);
    }
    return result;
}



module.exports = {
    chooseNRandomWithoutReplacement, sortByDate, getDatetime
}