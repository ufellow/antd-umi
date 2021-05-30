import request from '@/utils/request/request';

export function loginService(start, limit) {
    const body = new FormData();
    body.append('start', start);
    body.append('limit', limit);
    return request.post('news/menu/query', { body });
}
