const contact = {
    name: "이종화2",
    email: "gran003@gmail.com"
};

const vcard = `BEGIN:VCARD
VERSION:3.0
FN:이종화
TEL;TYPE=CELL:+82-10-9122-4175
EMAIL;TYPE=WORKD:gran003@gmail.com
END:VCARD`;
const blob = new Blob([vcard], { type: "text/vcard" });
const url = URL.createObjectURL(blob);


window.onload = function () {
    const elem = document.getElementById("button");
    elem.onclick = () => {
        const link = document.createElement("a");
        link.href = url;
        link.download = contact.name + ".vcf";
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}