export function SearchAttributes(attr, userData) {
    for (var i = 0; i < userData.length; i++) {
        if (userData[i].Name === attr) {
            return userData[i].Value;
        }
    }
}