
const getElement = (item) => {
    switch (item.type) {
        case "header":
            return createHeader(item);
        case "programSection":
            return createProgramSelectionTable(item);
        case "sectionTitle":
            return createSectionTitle(item);
        case "grid":
            return createGrid(item);
        case "infoBlock":
            return createInfoBlock(item);
        case "workshopBlock":
            return createWorkshopBlock(item);
        case "conceptImage":
            return createConcepImage(item);
        default:
            return ``;
    }

}

const createHeader = ({ date, title }) => {

    return `<header class="main-header">
            <div class="date-time">${date}</div>
            <h1 class="program-title">
                <span class="title-main">${title.main}</span>
                <span class="title-sub">${title.sub}</span>
            </h1>
        </header>`
}

const createProgramSelectionTable = ({ header, body }) => {

    const table = `
    <table class="schedule-table">
        <thead>
        <tr>
            ${header.map((text) => `<th>${text}</th>`).join('')}
        </tr>
        </thead>
        <tbody>
            ${body.map((data) => `<tr>${data.map((text) => `<td>${text}</td>`).join('')}</tr>`).join('')}
        </tbody>
    </table>`
    return table;
}

const createSectionTitle = ({ name, subTitle }) => {
    return `<h2 class="section-title">
                <span class="session-name">${name}</span>
                ${subTitle ? `<span class="session-subtitle">${subTitle}</span>` : ''}
            </h2>`;
}

const createGrid = ({ header, sectionHeader, content, footer }) => {
    return `
        <div class="operation-grid">
                <div class="grid-cell grid-header">
                ${header.map(({title, desc})=>`
                    <h4>${title}</h4>
                        <div class="content-item">${desc}</div>
                `).join('')}
                </div>
                <div class="grid-cell section-header">${sectionHeader}</div>
                ${content.map((contents)=>`
                    <div class="grid-cell grid-content">
                        ${contents.map(({title, items})=>`
                        <h4>${title}</h4>
                        ${items.map((text)=>`<div class="content-item">${text}</div>`).join('')}
                        `).join('')}
                    </div>`
                ).join('')}
                ${footer.map((footerText)=>`<div class="grid-cell grid-footer">${footerText}</div>`).join('')}
                </div>
    `
}


const createInfoBlock = ({ title, contentBox }) => {
    return `
        <div class="info-block philosophy-block">
            <h3 class="block-title">${title}</h3>
            <div class="content-box">
                ${contentBox.map((item)=>`<div class="content-item">${item}</div>`).join('')}
            </div>
        </div>
    `
}

const createWorkshopBlock = ({ blockTitle, conceptTitle, image, example }) => {
    return `
        <div class="info-block workshop-block">
            <h3 class="block-title">${blockTitle}</h3>
            <h4 class="concept-title">${conceptTitle}</h4>
            ${image ? `<img class="concept-image" src="${image.url}" alt="${image.alt}">` : ''}
            ${example ? example.map(({title, code}, index)=>`
            <h5 class="example-title">${title}</h5>
            <pre class="code-example" ${index === 0 ? 'top' : ''}>${code}</pre>
            `).join('') : ''}
        </div>
    `
};

const createConcepImage = ({ image }) => {
    const { url, alt } = image;
    return `
        <div class="info-block">
            <img class="concept-image" src="${url}" alt="${alt}">
        </div>
    `
}

window.addEventListener("DOMContentLoaded", (event) => {

    fetch('./data.json').then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // JSON 데이터로 파싱
    })
        .then(data => {
            document.querySelector("#main").innerHTML =
                data["body"].map((item) => getElement(item)).join('');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

});