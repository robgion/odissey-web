import {environment} from '../../../environments/environment';

export class BaseService {
    protected baseUrl: string;
    constructor() {
        this.baseUrl = environment.remoteApiBaseUrl;
    }

    /**
     * Costruzione dinamica dell'url da invocare
     * @param uri
     * @protected
     */
    protected buildUrl(uri: string): string {
        return `${this.baseUrl}/${uri}`;
    }
}
