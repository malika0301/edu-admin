let path = new URLSearchParams(location.search);
let id = path.get("studentId");

let studentContent = document.getElementById("single-student");

// ---- MAIN ----
async function getSingleStudent(id) {
    try {
        let res = await axios.get(`https://6921f0ae512fb4140be1d12d.mockapi.io/students/${id}`);
        renderStudent(res.data);
        initTabs();
        loadTeacher(res.data.teacherId);
    } catch (err) {
        console.log(err);
    }
}

function renderStudent(el) {
    studentContent.innerHTML = `
        <div class="max-w-[500px] mx-auto p-[20px] w-full rounded-[20px] border border-gray-400 shadow-2xl mb-5">
            <div class="flex justify-center">
                <img class="w-[120px] h-[120px] rounded-full object-cover border-[5px] border-blue-200" src="${el.avatar}">
            </div>

            <h1 class="text-center text-[25px] font-bold mt-[15px]">${el.name}</h1>
            <p class="text-center text-gray-500">Grade: ${el.grade}</p>

            <div class="mt-[20px] flex flex-col gap-[10px] text-gray-700">
                <p>Age: ${el.age}</p>
                <p>Rating: ${el.rating} ⭐</p>

                <div class="w-full h-[4px] rounded-[50px] bg-red-300 overflow-hidden mt-2">
                    <div style="width:${el.rating}%" class="h-[4px] bg-blue-500 rounded-[50px]"></div>
                </div>

                <p>Coins: ${el.coins} 🪙</p>
                 <div class="w-full h-[4px] rounded-[50px] bg-red-300 overflow-hidden mt-2">
                    <div style="width:${el.coins}%" class="h-[4px] bg-blue-500 rounded-[50px]"></div>
                </div>
            </div>

            <button onclick="history.back()" class="mt-[20px] w-full py-[10px] bg-gradient-to-r from-blue-500 text-white to-purple-600 hover:from-purple-600 hover:to-blue-500 font-bold rounded-[10px]">Previous</button>
        </div>

        <div class="max-w-[500px] mx-auto p-[20px] rounded-[20px] w-full h-auto border border-gray-400 shadow-2xl">
            <div class="flex justify-center gap-4 py-1.5 rounded-xl mb-5">
                <button id="btn1" class="px-4 py-1 text-gray-500 rounded">Contact Info</button>
                <button id="btn2" class="px-4 py-1 text-gray-500 rounded">Assigned Teacher</button>
            </div>

            <div id="contact-info" class="grid grid-cols-1 text-gray-800 sm:grid-cols-2 gap-4">
                <p>Phone: ${el.number}</p>
                <p>Email: ${el.email}</p>
                <p>Telegram: ${el.user}</p>
                <p>Linkedin: ${el.lin}</p>
            </div>

            <div id="teacher-info" class="grid gap-[20px] mt-5 hidden"></div>
        </div>
    `;
}

function initTabs() {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const contactInfo = document.getElementById("contact-info");
    const teacherInfo = document.getElementById("teacher-info");

    btn1.addEventListener("click", () => {
        contactInfo.classList.remove("hidden");
        teacherInfo.classList.add("hidden");
        btn2.classList.add("text-gray-500");
        btn1.classList.remove("text-gray-500");


    });

    btn2.addEventListener("click", () => {
        contactInfo.classList.add("hidden");
        teacherInfo.classList.remove("hidden");
        btn1.classList.add("text-gray-500");
        btn2.classList.remove("text-gray-500");


    });
}

async function loadTeacher(teacherId) {
    try {
        let teacherInfo = document.getElementById("teacher-info");

        if (!teacherId) {
            teacherInfo.innerHTML = `<p class="text-gray-500">No teacher assigned</p>`;
            return;
        }

        let res = await axios.get(`https://6921f0ae512fb4140be1d12d.mockapi.io/teachers/${teacherId}`);

        let t = res.data;

        teacherInfo.innerHTML = `
            <a href="./single-teacher.html?teacherId=${t.id}" class="p-[15px] w-full bg-gray-300 rounded-[20px]">
                <div class="flex items-center justify-between gap-[10px]">
                    <div class="flex items-center gap-[7px]">
                        <img class="w-[70px] h-[70px] object-cover rounded-full border border-blue-200 border-[5px]" src="${t.avatar}">
                        <div>
                            <h1>${t.name}</h1>
                            <p class="text-gray-500">${t.profession}</p>
                        </div>
                    </div>
                    <div class="flex gap-[5px] items-center"><p>${t.raiting}</p>⭐</div>
                </div>
            </a>
        `;
    } catch (err) {
        console.log(err);
    }
}

getSingleStudent(id);
