import { expect, test } from "@playwright/test";
// import { allure } from "allure-playwright";
import { allure, LabelName } from "allure-playwright";
const yaml = require('js-yaml');
const fs   = require('fs');
const doc = yaml.load(fs.readFileSync("tests/prod.yml", 'utf8'));
let id;
let headers = {
    'Accept': "application/json",
    'Content-Type': "application/json"
};


test('[bk-1] GET/ping', async ({ request, baseURL }, testInfo) => {
    allure.label({ name: LabelName.LANGUAGE, value: "javascript" });
    //Ping site
    allure.link({ url: `${baseURL}`, name: "Welcome to Restful-Booker" });
    let requestPing = {
        URL: `${baseURL}/ping`
    };
    await testInfo.attach("REQUEST", {
        body: JSON.stringify(requestPing),
    });
    const ping = await request.get(`${baseURL}/ping`, {
    });
    expect(ping.status()).toBe(201);
    await testInfo.attach("STATUS", {
        body: JSON.stringify(ping.status()),
    });
    expect(ping.ok()).toBeTruthy();
    expect(ping.status()).toBe(201);
    console.log("This request DONE !!!!");
});

test('[bk-2] POST/auth', async ({ request, baseURL }, testInfo) => {
    // Add token
    let requestAuth = {
        URL: `${baseURL}/auth`,
        body: doc.signIn
    };
    const auth = await request.post(`${baseURL}/auth`, {
        headers,
        data: doc.signIn
    });
    await testInfo.attach("REQUEST", {
        body: JSON.stringify(requestAuth),
    });
    await testInfo.attach("RESPONSE", {
        body: JSON.stringify(await auth.json()),
    });
    await testInfo.attach("STATUS", {
    body: JSON.stringify(auth.status()),
    });
    expect(auth.status()).toBe(200);
    expect(auth.ok()).toBeTruthy();
    headers.Cookie = `token=${(await auth.json()).token}`;
    // console.log("второе");
});

test('[bk-3] POST/booking', async ({ request, baseURL }, testInfo) => {
    //CREATE
    const createEntry = await request.post(`${baseURL}/booking`, {
        data: doc.bookingPost
    });
    id = (await createEntry.json()).bookingid;
    expect(createEntry.status()).toBe(200);
    expect(createEntry.ok()).toBeTruthy();
    let requestCreate = {
        URL: `${baseURL}/booking`,
        headers: headers,
        body: doc.bookingPost
    };
    await testInfo.attach("REQUEST", {
        body: JSON.stringify(requestCreate),
    });
    await testInfo.attach("RESPONSE", {
        body: JSON.stringify(await createEntry.json()),
    });
    await testInfo.attach("STATUS", {
    body: JSON.stringify(createEntry.status()),
    });
});

test('[bk-4] PUT/booking{id}', async ({ request, baseURL }, testInfo) => {
    //PUT
    const putEntry = await request.put(`${baseURL}/booking/${id}`, {
        headers,
        data : doc.bookingPut
    });
    let requestPut = {
        URL: `${baseURL}/booking/${id}`,
        headers: headers,
        body: doc.bookingPut
    };
    expect(putEntry.status()).toBe(200);
    expect(putEntry.ok()).toBeTruthy();
    await testInfo.attach("REQUEST", {
        body: JSON.stringify(requestPut),
    });
    let a = await putEntry.json();
    await testInfo.attach("RESPONSE", {
        body: JSON.stringify(a),
    });
    await testInfo.attach("STATUS", {
    body: JSON.stringify(putEntry.status()),
    });
});

test('[bk-5] PATCH/booking{id}', async ({ request, baseURL }, testInfo) => {
    //PATCH
    const patchEntry = await request.patch(`${baseURL}/booking/${id}`, {
        headers,
        data: doc.bookingPatch
    });
    expect(patchEntry.status()).toBe(200);
    expect(patchEntry.ok()).toBeTruthy();
    let requestPatch = {
        URL: `${baseURL}/booking/${id}`,
        headers: headers,
        body: doc.bookingPatch
    };
    await testInfo.attach("REQUEST", {
        body: JSON.stringify(requestPatch),
    });
    await testInfo.attach("RESPONSE", {
        body: JSON.stringify(await patchEntry.json()),
    });
    await testInfo.attach("STATUS", {
    body: JSON.stringify(patchEntry.status()),
    });
});

test('[bk-6] DELETE/booking{id}', async ({ request, baseURL }, testInfo) => {
    //DELETE
    const deleteEntry = await request.delete(`${baseURL}/booking/${id}`, {
        headers
    });
    let requestDelete = {
        URL: `${baseURL}/booking/${id}`,
        headers: headers
    };
    await testInfo.attach("REQUEST", {
        body: JSON.stringify(requestDelete),
    });
    await testInfo.attach("RESPONSE", {
        body: JSON.stringify("Delete completed"),
    });
    await testInfo.attach("STATUS", {
    body: JSON.stringify(deleteEntry.status()),
    });
    expect(deleteEntry.status()).toBe(201);
});

test('[bk-7] PUT/booking{id} - faild', async ({ request, baseURL }, testInfo) => {
    //PUT
    const putEntry = await request.put(`${baseURL}/booking/${id}`, {
        headers,
        data : doc.bookingPut
    });
    let requestPut = {
        URL: `${baseURL}/booking/${id}`,
        headers: headers,
        body: doc.bookingPut
    };
    await testInfo.attach("REQUEST", {
        body: JSON.stringify(requestPut),
    });
    expect(putEntry.status()).toBe(200);
    expect(putEntry.ok()).toBeTruthy();
    let a = await putEntry.json();
    await testInfo.attach("RESPONSE", {
        body: JSON.stringify(a),
    });
    await testInfo.attach("STATUS", {
    body: JSON.stringify(putEntry.status()),
    });
});
