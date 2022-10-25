function vaild(text) {
    return text.replace(/\s/g, '');
}
var twofactor = document.querySelector('#twofactor');
document.querySelector('#submit').addEventListener('click', function () {
    if(vaild(twofactor.value) == '') return;
    axios({
        method: 'POST',
        url: '/2fa',
        data: {
            secret: vaild(twofactor.value)
        }
    }).then(function (response) {
        document.querySelector('#result').value = twofactor.value + " | " + response.data;
    }).catch(function (error) {
        console.log(error);
        document.querySelector('#result').value = "Đã có lỗi xảy ra";
    })
});
document.querySelector('#copy').addEventListener('click', function () {
    document.querySelector('#result').select();
    document.execCommand('copy');
    document.querySelector('#copy').style.backgroundColor = "green";
    document.querySelector('#copy').style.color = "white";
    document.querySelector('#copy').innerHTML = "Đã copy";
    setTimeout(function () {
        document.querySelector('#copy').style.backgroundColor = "#007bff";
        document.querySelector('#copy').style.color = "white";
        document.querySelector('#copy').innerHTML = "Copy";
    }, 1000);
});
// 9