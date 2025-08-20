
//Create Model Brand-model.ts

import { Brand } from '@prisma/client'
export type BrandResponse = {
id: number,
kode: string,
nama: string,
}

//CreateBrandRequest
export type CreateBrandRequest = {
id: number,
kode: string,
nama: string,
}

//UpdateBrandRequest
export type UpdateBrandRequest = {
id: number,
kode: string,
nama: string,
}

//SearchBrandRequest
export type SearchBrandRequest = {
//id: number,
kode: string,
nama: string,
page : number,
size : number,
}

//toBrandResponse
export function toBrandResponse(brand: Brand): BrandResponse {
return { 
id: brand.id,
kode:brand.kode,
nama:brand.nama,
}
}

