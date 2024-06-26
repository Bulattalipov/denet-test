document.addEventListener('DOMContentLoaded', function () {

  function connectWallet() {
    const walletBtn = document.getElementById('walletBtn');
    const walletAdress = document.getElementById('walletAdress');
    const connectText = document.querySelector('.header__box-text');
    const btn = document.querySelector('.header__box-btn');
    const walletBalance = document.getElementById('walletBalance');

    let account;

    const connectAccount = window.ethereum.request({
      "method": "eth_accounts"
    })

    connectAccount.then(data => {
      if (data.length === 0) {
        walletBtn.addEventListener('click', async () => {
          await init()
        })
      } else {
        init();
      }
    })

    async function init() {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          "method": "eth_requestAccounts"
        }).catch(error => {
          console.log(error)
        })

        account = accounts[0];
        walletAdress.innerHTML = account.substr(0, 5) + '...' + account.substr(39, 3);

        connectText.style.display = "block";
        btn.style.display = "none";

        getBalance();
      } else {
        console.log("Установите Metamask кошелёк")
      }
    }

    async function getBalance() {
      let balance = await window.ethereum.request({
        "method": "eth_getBalance",
        "params": [
          account
        ]
      })

      walletBalance.innerHTML = (parseInt(balance, 16) / 10 ** 18).toFixed(3);
    }
  }

  connectWallet();



  function sha256Main() {
    const textarea = document.getElementById("shaBlock");
    const text = document.querySelector('#textShaBlock span');

    textarea.addEventListener('input', (e) => {
      text.innerHTML = sha256(e.target.value);
    })
  }

  sha256Main();


  function aesMain() {
    const textarea = document.getElementById("aesBlock");
    const text = document.querySelector('#textAesBlock span');

    textarea.addEventListener('input', (e) => {
      text.innerHTML = aesjs.utils.hex.toBytes(e.target.value);
    })
  }

  aesMain();



})