import { types } from "../../../src/auth/types/types";

describe("Testing types", () => {
    test("should return these types", () => {
        expect(types).toEqual({ login: "[Auth] Login", logout: "[Auth] Logout" });
    });
});
