function convertDate(since) {
    const dated = new Date(since);
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    return dated.toLocaleDateString('id-ID', options)  
}

module.exports = convertDate

