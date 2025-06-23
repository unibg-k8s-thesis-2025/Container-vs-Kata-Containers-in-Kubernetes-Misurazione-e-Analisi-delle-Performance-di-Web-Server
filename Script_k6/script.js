import http from 'k6/http';
import { sleep, check, group, trend } from 'k6';

const BASE_URL = 'http://localhost:37103';

export const options = {
  stages: [
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 2000 },
    { duration: '1m', target: 3000 },
    { duration: '1m', target: 4000 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'],
    'http_req_failed': ['rate<0.2'],
  },
};

export default function () {
  group('GET request', () => {
    let res = http.get(BASE_URL);
    
    check(res, {
      'Status is 200': (r) => r.status === 200,
    });
  });
	/*
  group('POST request', () => {
    let payload = JSON.stringify({ name: 'TestUser', email: 'test@example.com' });
    let headers = { 'Content-Type': 'application/json' };

    let res = http.post('http://localhost:30100/api/data', payload, { headers });
    check(res, {
      'Status is 201 or 200': (r) => r.status === 201 || r.status === 200,
    });
  });*/

  sleep(1);
}
