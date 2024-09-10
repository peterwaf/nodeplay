function showDateTime() {
    const date = new Date();
    const today = date.toLocaleDateString();
    const time = date.toLocaleTimeString();
    console.log(today);
    console.log(time);
}

module.exports = showDateTime;