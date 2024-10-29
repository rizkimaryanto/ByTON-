// Menghubungkan ke smart contract ByTONToken di jaringan Polygon
const contractABI = [
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"AirdropClaimed","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},
  {"inputs":[],"name":"airdropAllocation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"airdropClaimStart","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"claimAirdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"click","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"clicks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"completeTask","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"dailyTasks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"getTopUsers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasClaimedAirdrop","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"uint256","name":"uid","type":"uint256"}],"name":"registerUser","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userNames","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userUIDs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
];
const contractAddress = "0x6F167EB8A90B84346A17f707c7850F318Cc44aC6";

let contract;
let userAccount;

// Menghubungkan ke Metamask
async function connectWallet() {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAccount = accounts[0];
    document.getElementById("walletAddress").innerText = `Wallet: ${userAccount}`;
    const web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    alert("Please install MetaMask!");
  }
}

// Fungsi untuk mendaftarkan user
async function registerUser(userName, uid) {
  try {
    await contract.methods.registerUser(userName, uid).send({ from: userAccount });
    alert("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

// Fungsi untuk klaim airdrop
async function claimAirdrop() {
  try {
    await contract.methods.claimAirdrop().send({ from: userAccount });
    alert("Airdrop claimed successfully");
  } catch (error) {
    console.error("Error claiming airdrop:", error);
  }
}

// Fungsi untuk melakukan klik
async function click() {
  try {
    await contract.methods.click().send({ from: userAccount });
    alert("Click rewarded with 1 token");
  } catch (error) {
    console.error("Error on click:", error);
  }
}

// Fungsi untuk menyelesaikan tugas harian
async function completeTask() {
  try {
    await contract.methods.completeTask().send({ from: userAccount });
    alert("Task completed and rewarded with 5 tokens");
  } catch (error) {
    console.error("Error completing task:", error);
  }
}

// Fungsi untuk mendapatkan tanggal distribusi
function getAirdropStartDate() {
  const airdropTimestamp = 1672531200; // 1 Jan 2025
  const date = new Date(airdropTimestamp * 1000);
  document.getElementById("distributionDate").innerText = `Distribution Date: ${date.toLocaleDateString()}`;
}

// Fungsi untuk mendapatkan 100 user teratas berdasarkan klik
async function getTopUsers() {
  try {
    const topUsers = await contract.methods.getTopUsers().call();
    let topUsersList = "";
    topUsers.forEach((user, index) => {
      topUsersList += `${index + 1}. ${user}\n`;
    });
    document.getElementById("topUsers").innerText = topUsersList;
  } catch (error) {
    console.error("Error fetching top users:", error);
  }
}

// Panggil fungsi untuk mendapatkan tanggal distribusi saat load halaman
window.onload = () => {
  getAirdropStartDate();
};
