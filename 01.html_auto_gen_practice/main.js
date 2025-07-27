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
            return createElement("div");
    }

}

const createElement = (elementType, className, text) => {
    const element = document.createElement(elementType);
    if (className) {
        element.setAttribute('class', className);
    }
    if (text) {
        element.innerText = text;
    }
    return element;
}

const createHeader = ({ date, title }) => {
    const header = createElement('header', 'main-header');
    header.append(createElement('div', 'date-time', date));

    const h1 = createElement('h1', 'program-title');
    h1.append(createElement('span', 'title-main', title.main));
    h1.append(createElement('span', 'title-main', title.sub));

    header.append(h1);
    return header;
}

const createProgramSelectionTable = ({ header, body }) => {
    const table = createElement('table', 'schedule-table');
    const thead = createElement('thead');
    const tr = createElement('tr');
    header.forEach((text) => {
        tr.append(createElement('th', undefined, text));
    });
    thead.append(tr);
    table.append(thead);

    const tbody = createElement('tbody');
    body.forEach((data) => {
        const trForTbody = createElement('tr');
        data.forEach((text) => {
            trForTbody.append(createElement('td', undefined, text));
        });
        tbody.append(trForTbody);
    })
    table.append(tbody);
    return table;
}

const createSectionTitle = ({ name, subTitle }) => {
    const h2 = createElement('h2', 'section-title');
    h2.append(createElement('span', 'session-name', name));
    if (subTitle) {
        h2.append(createElement('span', 'session-subtitle', subTitle));
    }
    return h2;
}

const createGrid = ({ header, sectionHeader, content, footer }) => {
    const grid = createElement('div', 'operation-grid');

    const girdCell = createElement('div', 'grid-cell grid-header');
    header.forEach(({ title, desc }) => {
        girdCell.append(createElement('h4', undefined, title));
        girdCell.append(createElement('div', 'content-item', desc));
    });
    grid.append(girdCell);
    grid.append(createElement('div', 'grid-cell section-header', sectionHeader));

    content.forEach((contents) => {
        const content = createElement('div', 'grid-cell grid-content');
        contents.forEach(({ title, items }) => {
            content.append(createElement('h4', undefined, title));
            items.forEach((text) => {
                content.append(createElement('div', 'content-item', text));
            })
        });
        grid.append(content);
    });

    footer.forEach((footerText) => {
        grid.append(createElement('div', 'grid-cell grid-footer', footerText));
    })

    return grid;
}


const createInfoBlock = ({ title, contentBox }) => {
    const article = createElement('div', 'info-block philosophy-block');
    article.append(createElement('h3', 'block-title', title));
    const div = createElement('div', 'content-box');
    contentBox.forEach((item) => {
        div.append(createElement('div', 'content-item', item));
    })
    article.append(div);
    return article;
}

const createWorkshopBlock = ({ blockTitle, conceptTitle, image, example }) => {
    const article = createElement('div', 'info-block workshop-block');
    article.append(createElement('h3', 'block-title', blockTitle));
    article.append(createElement('h4', 'concept-title', conceptTitle));
    if (image) {
        const img = createElement('img', 'concept-image');
        img.setAttribute('src', image.url);
        img.setAttribute('alt', image.alt);
        article.append(img);
    }
    if(example) {
        example.forEach(({title, code}, index)=> {
            article.append(createElement('h5', 'example-title', title));
            article.append(createElement('pre', `code-example ${index === 0? 'top' : ''}`, code));
        })
    }

    return article;
};

const createConcepImage = ({ image }) => {
    const article = createElement('div', 'info-block');
    const img = createElement('img', 'concept-image');
    img.setAttribute('src', image.url);
    img.setAttribute('alt', image.alt);
    article.append(img);
    return article;
}

window.addEventListener("DOMContentLoaded", (event) => {

    fetch('./data.json').then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // JSON 데이터로 파싱
    })
        .then(data => {
            const main = document.querySelector("#main");
            data["body"].forEach((item) => {
                main.append(getElement(item));
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

});