export type CLIAuthPayload = {
    token: string;
    network: {
        url: string;
        chainId: number;
    }
}

export type CLIAuthResponse = {
    code: string,
    address: string,
    configurable: {
        SIGNATURES_COUNT: number,
        SIGNERS: string[],
        HASH_PREDICATE: string
    },
    tokenConfig: {
        transactionTitle: string;
    }
}

export const API_URL = 'http://localhost:3333';

export const generateCLIAuth = async (payload: CLIAuthPayload) => {
    const response = await fetch(`${API_URL}/cli/auth`, {
        body: JSON.stringify({
            token: payload.token,
            network: payload.network
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json() as CLIAuthResponse;
}