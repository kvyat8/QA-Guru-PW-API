import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { GetChalengeStatus } from "./helpers";
import { TodoService } from "./helpers";
import { SecretService } from "./helpers";


test.describe("API challenge", () => {
  let URL = "https://apichallenges.herokuapp.com/";
  let token;

  test.beforeAll(async ({ request }) => {
   
    let response = await request.post(`${URL}challenger`);
    let headers = await response.headers();
    token = headers["x-challenger"];
    // Пример ассерта
    console.log(`Получить результаты ${URL}gui/challenges/${token}`);

    expect(headers).toEqual(
      expect.objectContaining({ "x-challenger": expect.any(String) }),

    );


  });


  test('2 Получение списка заданий GET /challenges', {tag: ['@API', '@GET'],}, async ({ request }) => {
    let challenge = 2;
    let response = await request.get(`${URL}challenges`, {
      headers: {
        "x-challenger": token,
      }
    });

    let chalengesBody = await response.json();

    

    expect(chalengesBody.challenges[challenge-1].status).toBe(true);
    expect(response.status()).toBe(200)
  
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });

  test('3 Получение списка TODO GET /todos', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 3;
    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
      }
    });


    
    expect(response.status()).toBe(200)
 
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });

  test('4 Получение 404 - некорректный урл GET /todos', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 4;
    let response = await request.get(`${URL}todo`, {
      headers: {
        "x-challenger": token,
      }
    });

    
    expect(response.status()).toBe(404)
 
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });

  test('5 Выбор конкретного TODO GET /todos', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 5;
    let response = await request.get(`${URL}todos/10`, {
      headers: {
        "x-challenger": token,
      }
    });

    
    expect(response.status()).toBe(200)
    //
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });


  test('6 Выбор некорректного TODO GET /todos', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 6;
    let response = await request.get(`${URL}todos/10000`, {
      headers: {
        "x-challenger": token,
      }
    });

    
    expect(response.status()).toBe(404)
    //
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });

  test('7 Фильтрация TODO GET /todos?doneStatus=', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 7;

    await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.person.bio(),
        doneStatus: true,
        description: faker.person.bio()
      }
    });


    let responseTrue = await request.get(`${URL}todos?doneStatus=true`, {
      headers: {
        "x-challenger": token,
      }
    });

    
    expect(responseTrue.status()).toBe(200)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });

  test('8 Список TODO HEAD /todos', {tag: ['@API', '@HEAD']}, async ({ request }) => {
    let challenge = 8;
    let response = await request.head(`${URL}todos`, {
      headers: {
        "x-challenger": token,
      }
    });


    
    expect(response.status()).toBe(200)

    //
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });


  test('9 Создание записи POST /todos', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 9;
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.person.bio(),
        doneStatus: true,
        description: faker.person.bio()
      }
    });


    
    expect(response.status()).toBe(201)
    //
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });

  test('10 Создание записи POST /todos с неправильным статусом', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 10;
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.person.bio(),
        doneStatus: faker.person.bio(),
        description: faker.person.bio()
      }
    });


    
    expect(response.status()).toBe(400)
    //
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });



  test('11 Создание записи POST /todos с длинным title', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 11;
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.word.words(10),
        doneStatus: true,
        description: faker.person.bio()
      }
    });


    
    expect(response.status()).toBe(400)
    //
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });

  test('12 Создание записи POST /todos с длинным description', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 12;
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.person.bio(),
        doneStatus: true,
        description: faker.word.words(100)
      }
    });


    
    expect(response.status()).toBe(400)
    //
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });

  test('13 Создание записи POST /todos с title & description по максимуму', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 13;
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.string.alpha(50),
        doneStatus: true,
        description: faker.string.alpha(200)
      }
    });


    
    expect(response.status()).toBe(201)
    //
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });

  test('14 Создание записи POST /todos с превышением 5к символов', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 14;
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.string.alpha(5000),
        doneStatus: true,
        description: faker.string.alpha(200)
      }
    });


    
    expect(response.status()).toBe(413)
    //
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
    
  });

  test('15 Создание записи POST /todos с недопустимыми полями', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 15;
    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.string.alpha(50),
        doneStatus: true,
        priority: true,
        description: faker.string.alpha(200)
      }
    });


    
    expect(response.status()).toBe(400)
    //
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('16 Создание записи через PUT /todos', {tag: ['@API', '@PUT']}, async ({ request }) => {
    let challenge = 16;
    let response = await request.put(`${URL}todos/${faker.number.int(1000)}`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.string.alpha(50),
        doneStatus: true,
        description: faker.string.alpha(200)
      }
    });


    
    expect(response.status()).toBe(400)
    //
    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
  });

  test('17 Изменение записи POST /todos', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 17;

    let todoservice = new TodoService(request);
    let todo = await todoservice.getRandomTodo(token);

    let response = await request.post(`${URL}todos/${todo.id}`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.string.alpha(50),
        doneStatus: true,
        description: faker.string.alpha(200)
      }
    });


    
    expect(response.status()).toBe(200)
    //

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
  });


  test('18 Изменение несуществующей записи POST /todos', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 18;

    let response = await request.post(`${URL}todos/${ faker.string.alpha(5)}`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.string.alpha(50),
        doneStatus: true,
        description: faker.string.alpha(200)
      }
    });


    
    expect(response.status()).toBe(404)
    //

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });



  test('19 Изменение записи PUT /todos', {tag: ['@API', '@PUT']}, async ({ request }) => {
    let challenge = 19;

    let todoservice = new TodoService(request);
    let todo = await todoservice.getRandomTodo(token);


    let response = await request.put(`${URL}todos/${todo.id}`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.string.alpha(50),
        doneStatus: true,
        description: faker.string.alpha(200)
      }
    });


    
    expect(response.status()).toBe(200)
    //


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });


  test('20 Изменение записи PUT /todos', {tag: ['@API', '@PUT']}, async ({ request }) => {
    let challenge = 20;

    let todoservice = new TodoService(request);
    let todo = await todoservice.getRandomTodo(token);


    let response = await request.put(`${URL}todos/${todo.id}`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        title: faker.string.alpha(50)
      }
    });


    
    expect(response.status()).toBe(200)
    //


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });


  test('21 Изменение записи PUT без title /todos', {tag: ['@API', '@PUT']}, async ({ request }) => {
    let challenge = 21;

    let todoservice = new TodoService(request);
    let todo = await todoservice.getRandomTodo(token);


    let response = await request.put(`${URL}todos/${todo.id}`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        doneStatus: true,
        description: faker.string.alpha(200)
      }
    });


    
    expect(response.status()).toBe(400)


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });


  test('22 Изменение записи PUT с некорректным ID /todos', {tag: ['@API', '@PUT']}, async ({ request }) => {
    let challenge = 22;

    let todoservice = new TodoService(request);
    let todo = await todoservice.getRandomTodo(token);


    let response = await request.put(`${URL}todos/${todo.id}`, {
      headers: {
        "x-challenger": token,
      },
      data: {
        id: faker.number.int(1000),
        title: faker.string.alpha(50),
        doneStatus: true,
        description: faker.string.alpha(200)
      }
    });


    
    expect(response.status()).toBe(400)


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });


  test('23 Удаление записи DELETE /todos', {tag: ['@API', '@DELETE']}, async ({ request }) => {
    let challenge = 23;

    let todoservice = new TodoService(request);
    let todo = await todoservice.getRandomTodo(token);


    let response = await request.delete(`${URL}todos/${todo.id}`, {
      headers: {
        "x-challenger": token,
      }
      
    });


    
    expect(response.status()).toBe(200)


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('24 Получение опций OPTIONS /todos', {tag: ['@API', '@OPTIONS']}, async ({ request }) => {
    let challenge = 24;

    let response = await request.fetch(`${URL}todos`, {
      method: "OPTIONS",
      headers: {
        "x-challenger": token,
      }
      
    });


    
    expect(response.status()).toBe(200)


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('25 Получение GET /todos в XML', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 25;

    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/xml"
      }
      
    });


    
   
    let responseHeaders = await response.headers();
    expect(response.status()).toBe(200)
    expect(responseHeaders['content-type']).toEqual('application/xml')


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('26 Получение GET /todos в JSON', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 26;

    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json"
      }
      
    });


    
    expect(response.status()).toBe(200)

    let responseHeaders = await response.headers();
    expect(response.status()).toBe(200)
    expect(responseHeaders['content-type']).toEqual('application/json')


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('27 Получение GET /todos в any', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 27;

    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "*/*"
      }
      
    });


    
    expect(response.status()).toBe(200)

    let responseHeaders = await response.headers();
    expect(response.status()).toBe(200)
    expect(responseHeaders['content-type']).toEqual('application/json')


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('28 Получение GET /todos в предпочитаемом формате', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 28;

    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/xml, application/json"
      }
      
    });


    
    expect(response.status()).toBe(200)

    let responseHeaders = await response.headers();
    expect(response.status()).toBe(200)
    expect(responseHeaders['content-type']).toEqual('application/xml')


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('29 Получение GET /todos без предпочитаемого формата', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 29;

    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": ""
      }
    
    });


    
    expect(response.status()).toBe(200)


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });


  test('30 Получение GET /todos в некорректном формате', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 30;

    let response = await request.get(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/gzip"
      }
    
    });


    
    expect(response.status()).toBe(406)


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('31 Отправка POST /todos в XML формате', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 31;


    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/xml",
        "content-type": "application/xml"
      },
      data: `
        <title>${faker.person.bio()}</title>
        <doneStatus>true</doneStatus>
        <description>${faker.person.bio()}</description>
        `
      
    });


    
    expect(response.status()).toBe(201)

    let responseHeaders = await response.headers();
    expect(responseHeaders['content-type']).toEqual('application/xml')


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('32 Отправка POST /todos в JSON формате', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 32;


    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "content-type": "application/json"
      },
      data: {
        title: faker.person.bio(),
        doneStatus: true,
        description: faker.person.bio()
      }
      
    });


    
    expect(response.status()).toBe(201)

    let responseHeaders = await response.headers();
    expect(responseHeaders['content-type']).toEqual('application/json')


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('33 Отправка POST /todos в некорректном формате', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 33;


    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "content-type": "application/gzip"
      },
      data: {
        title: faker.person.bio(),
        doneStatus: true,
        description: faker.person.bio()
      }
      
    });


    
    expect(response.status()).toBe(415)

    let responseHeaders = await response.headers();
    expect(responseHeaders['content-type']).toEqual('application/json')


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });


  test('34 Отправка GET /challenger/guid', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 34;


    let response = await request.get(`${URL}challenger/${token}`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
      }
    });


    
    expect(response.status()).toBe(200)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('35 Отправка PUT /challenger/guid', {tag: ['@API', '@PUT']}, async ({ request }) => {
    let challenge = 35;

    let getRequest = await request.get(`${URL}challenger/${token}`, {
      headers: {
        "x-challenger": token
      }
    });

    let getBody = await getRequest.json();


    let response = await request.put(`${URL}challenger/${token}`, {
      headers: {
        "x-challenger": token
      },
      data:getBody
    });


    
    expect(response.status()).toBe(200)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test.skip('36 Отправка PUT /challenger/guid для нового юзера', {tag: ['@API', '@PUT']}, async ({ request }) => {
    let challenge = 36;

/// починить позже 
    let getRequest = await request.get(`${URL}challenger/${token}`, {
      headers: {
        "x-challenger": token
      }
    });

    let getBody = await getRequest.json();


    let response = await request.put(`${URL}challenger/${token}`, {
      headers: {
        "x-challenger": token
      },
      data:getBody
    });


    
    expect(response.status()).toBe(200)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('37 Отправка GET /challenger/database/guid', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 37;


    let response = await request.get(`${URL}challenger/database/${token}`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
      }
    });


    
    expect(response.status()).toBe(200)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('38 Отправка PUT /challenger/database/guid', {tag: ['@API', '@PUT']}, async ({ request }) => {
    let challenge = 38;


    let getRequest = await request.get(`${URL}challenger/database/${token}`, {
      headers: {
        "x-challenger": token
      }
    });

    let getBody = await getRequest.json();


    let response = await request.put(`${URL}challenger/database/${token}`, {
      headers: {
        "x-challenger": token
      },
      data:getBody
    });

    
    expect(response.status()).toBe(204)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });


  test('39 Отправка POST /todos в некорректном формате', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 39;


    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "content-type": "application/xml"
      },
      data: `
        <title>${faker.person.bio()}</title>
        <doneStatus>true</doneStatus>
        <description>${faker.person.bio()}</description>
        `
      
    });


    
    expect(response.status()).toBe(201)

    let responseHeaders = await response.headers();
    expect(responseHeaders['content-type']).toEqual('application/json')


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('40 Отправка POST /todos в некорректном формате', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 40;


    let response = await request.post(`${URL}todos`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/xml",
        "content-type": "application/json"
      },
      data: {
        title: faker.person.bio(),
        doneStatus: true,
        description: faker.person.bio()
      }
      
    });


    
    expect(response.status()).toBe(201)

    let responseHeaders = await response.headers();
    expect(responseHeaders['content-type']).toEqual('application/xml')


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });


  test('41 Отправка DELETE /heartbeat', {tag: ['@API', '@DELETE']}, async ({ request }) => {
    let challenge = 41;


    let response = await request.delete(`${URL}heartbeat`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
      }
    });


    
    expect(response.status()).toBe(405)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('42 Отправка PATCH /heartbeat', {tag: ['@API', '@PATCH']}, async ({ request }) => {
    let challenge = 42;


    let response = await request.patch(`${URL}heartbeat`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
      }
    });

    
    expect(response.status()).toBe(500)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('43 Отправка TRACE /heartbeat', {tag: ['@API', '@TRACE']}, async ({ request }) => {
    let challenge = 43;


    let response = await request.fetch(`${URL}heartbeat`, {
      method: "TRACE",

      headers: {
        "x-challenger": token,
        "Accept": "application/json",
      }
    });

    
    expect(response.status()).toBe(501)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('44 Отправка GET /heartbeat', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 44;


    let response = await request.fetch(`${URL}heartbeat`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
      }
    });

    
    expect(response.status()).toBe(204)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('45 Отправка POST как DELETE  /heartbeat', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 45;


    let response = await request.post(`${URL}heartbeat`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "X-HTTP-Method-Override": "DELETE"
      }
    });

    
    expect(response.status()).toBe(405)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('46 Отправка POST как PATCH  /heartbeat', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 46;


    let response = await request.post(`${URL}heartbeat`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "X-HTTP-Method-Override": "PATCH"
      }
    });

    
    expect(response.status()).toBe(500)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('47 Отправка POST как TRACE  /heartbeat', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 47;


    let response = await request.post(`${URL}heartbeat`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "X-HTTP-Method-Override": "TRACE"
      }
    });

    
    expect(response.status()).toBe(501)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('48 Отправка POST c ошибкой  /secret/token', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 48;


    let response = await request.post(`${URL}secret/token`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "authorization": "Basic YWRtaW46cGFzc3dvcmQxMTE="
      }
    });

    
    expect(response.status()).toBe(401)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('49 Отправка POST  /secret/token', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 49;


    let response = await request.post(`${URL}secret/token`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "authorization": "Basic YWRtaW46cGFzc3dvcmQ="
      }
    });

    console.log(response);
    
    expect(response.status()).toBe(201)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('50 Отправка GET /secret/note c некорректным токеном', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 50;


    let response = await request.get(`${URL}secret/note`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "X-AUTH-TOKEN":"23d23e2"
      }
    });

    
    expect(response.status()).toBe(403)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('51 Отправка GET /secret/note без токена', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 51;


    let response = await request.get(`${URL}secret/note`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json"
      }
    });

    
    expect(response.status()).toBe(401)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('52 Отправка GET /secret/note c корректным токеном', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 52;

    let secret = new SecretService(request);
    let secretToken = await secret.getSecretToken(token);


    let response = await request.get(`${URL}secret/note`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "X-AUTH-TOKEN":secretToken
      }
    });

    
    expect(response.status()).toBe(200)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('53 Отправка POST /secret/note c записью', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 53;

    let secret = new SecretService(request);
    let secretToken = await secret.getSecretToken(token);

    let response = await request.post(`${URL}secret/note`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "X-AUTH-TOKEN":secretToken
      },
      data: {
        note:faker.person.bio()
      }
    });

    
    expect(response.status()).toBe(200)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('54 Отправка POST /secret/note без токена', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 54;


    let response = await request.post(`${URL}secret/note`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json"
      },
      data: {
        note:faker.person.bio()
      }
    });

    
    expect(response.status()).toBe(401)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('55 Отправка POST /secret/note c некорректным токеном', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 55;


    let response = await request.post(`${URL}secret/note`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "X-AUTH-TOKEN":`${faker.system}`

      },
      data: {
        note:faker.person.bio()
      }
    });

    
    expect(response.status()).toBe(403)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('56 Отправка GET /secret/note c bearer токеном', {tag: ['@API', '@GET']}, async ({ request }) => {
    let challenge = 56;

    let secret = new SecretService(request);
    let secretToken = await secret.getSecretToken(token);

    let response = await request.get(`${URL}secret/note`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "Authorization":`Bearer ${secretToken}`

      }
    });

    
    expect(response.status()).toBe(200)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('57 Отправка POST /secret/note c bearer токеном', {tag: ['@API', '@POST']}, async ({ request }) => {
    let challenge = 57;

    let secret = new SecretService(request);
    let secretToken = await secret.getSecretToken(token);

    let response = await request.post(`${URL}secret/note`, {
      headers: {
        "x-challenger": token,
        "Accept": "application/json",
        "Authorization":`Bearer ${secretToken}`
      },
      data: {
        note:faker.person.bio()
      }
    });

    
    expect(response.status()).toBe(200)

    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)

  });

  test('58 Удаление всех записей DELETE /todos', {tag: ['@API', '@DELETE']}, async ({ request }) => {
    let challenge = 58;

    let todoservice = new TodoService(request);
    let todoCount = await todoservice.getTodoCount(token);
    let todoList = await todoservice.getTodoList(token);
    let response


    for (let i = 0; i < todoCount; i += 1) {
      response = await request.delete(`${URL}todos/${todoList[i].id}`, {
        headers: {
          "x-challenger": token,
        }
  
      });
    }

    
    expect(response.status()).toBe(200)


    let status = new GetChalengeStatus(request);
    let challengeStatus = await status.getChallengeStatus(token, challenge);
    expect(challengeStatus).toBe(true)
      
    });


    test('59 Создание записи POST /todos по максимуму', {tag: ['@API', '@POST']}, async ({ request }) => {
      let challenge = 59;
      let response

      for (let i = 0; i < 11; i++) {
        response = await request.post(`${URL}todos`, {
          headers: {
            "x-challenger": token,
          },
          data: {
            title: faker.string.alpha(50),
            doneStatus: true,
            description: faker.string.alpha(200)
          }
        });
      }
  

      let status = new GetChalengeStatus(request);
      let challengeStatus = await status.getChallengeStatus(token, challenge);
      console.log(challengeStatus);
      expect(challengeStatus).toBe(true)
  
    });


});
