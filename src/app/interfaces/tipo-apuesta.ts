import { Deporte } from "./deporte";

export interface TipoApuesta {
    id: number;
    multiplicador: number;
    riesgo: string;
    deporteId: number;
    deporte: Deporte;
    descripcion: string;
}
