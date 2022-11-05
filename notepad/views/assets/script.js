document.querySelector('#save').addEventListener('click', () => {
    if (document.querySelector('#content').value == '') {
        document.querySelector('#content').style.border = '1px solid red';
        document.querySelector('#content').style.boxShadow = '0 0 5px red';
        document.querySelector('#content').style.color = 'red';
        document.querySelector('#content').placeholder = 'Content cannot be empty';
    } else {
        document.querySelector('#content').style.border = '1px solid #ccc';
        document.querySelector('#content').style.boxShadow = 'none';
        document.querySelector('#content').style.color = '#000';
        document.querySelector('#content').placeholder = 'Content';
        console.log(document.querySelector('#content').value)
        axios({
            method: 'post',
            url: '/create',
            data: {
                title: document.querySelector('#title').value,
                content: document.querySelector('#content').value
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async(res) => {
            if(res.data.status == 200){
                new Toasteur("top-right", 4000).success('Tạo ghi chú thành công!', 'Success');
                const content = (await axios.get(`${res.data.link}`)).data;
                document.querySelector('#result').innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title text-center">${res.data.title}</h5>
                            <textarea class="form-control" id="code" rows="10" type="text/html" readonly>${content}</textarea>
                            <button class="btn btn-primary mt-2" id="copy">Copy</button>
                            <a href="${res.data.link}" class="btn btn-primary mt-2" id="link">View</a>
                        </div>
                    </div>
                `;
                document.querySelector("#result").scrollIntoView();
                document.querySelector('#copy').addEventListener('click', () => {
                    document.querySelector('#code').select();
                    document.execCommand('copy');
                    document.querySelector('#copy').innerHTML = 'Copied';
                    document.querySelector('#copy').style.backgroundColor = 'green';
                    document.querySelector('#copy').style.color = '#fff';
                    setTimeout(() => {
                        document.querySelector('#copy').innerHTML = 'Copy';
                        document.querySelector('#copy').style.backgroundColor = '#007bff';
                        document.querySelector('#copy').style.color = '#fff';
                    }
                    , 1000);
                });
            }
            else{
                new Toasteur("top-right", 4000).error('Error', 'Đã có lỗi xảy ra!');
            }
        }).catch((err) => {
            console.log(err);
        });
    }
});
document.querySelector('#clear').addEventListener('click', () => {
    document.querySelector('#content').value = '';
});