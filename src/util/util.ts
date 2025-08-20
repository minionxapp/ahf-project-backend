import { writeFileSync } from "fs";
import { prismaClient } from "../application/database";
import { Seq } from "@prisma/client";
export class Util {

   static async capitalizeFirstLetter(val: string): Promise<string> {
      return (String(val).charAt(0).toUpperCase() + String(val).slice(1)).toString();
   }

   static async lowerFirstLetter(val: string): Promise<string> {
      return (String(val).charAt(0).toLowerCase() + String(val).slice(1)).toString();
   }
   static async createFile(namaFile: string, contentFile: string): Promise<string> {
      try {
         writeFileSync(namaFile, contentFile.toString(), {
            flag: "w"
         })

      } catch (error) {
         console.log(error)
         return 'Create file Gagal'
      }
      return 'Ok'
   }

   static async camelCase(str: string): Promise<string> {
      return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
   }

   static async snackCase(str: string): Promise<string> {
      return str.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
   }

   static async fileNameFormat(inputString: string): Promise<string> {
      return inputString
         .split("")
         .map((character, index) => {
            if (character === '_') {
               return '-';
            } else {
               if (character === character.toUpperCase()) {
                  return (index !== 0 ? "-" : "") + character.toLowerCase();
               } else {
                  return character;
               }

            }
         })
         .join("");
   }

   static async setKodeTraining(akademi: string): Promise<string> {
      let training
      try {
         training = await prismaClient.seq.findFirst({
         where: {
            kode: akademi,
            tahun: new Date().getFullYear()
         }
      });
      } catch (error) {
          training = await prismaClient.seq.create({
            data: {
               kode: akademi,
               tahun: new Date().getFullYear(),
               last_squence: 0,
               create_by: "system" // Replace "system" with the appropriate user or source if needed
            }
         })
      }
      

      if (!training) {
         throw new Error("Training sequence not found or last_squence is undefined");
      }

      training.last_squence = training.last_squence + 1;

      await prismaClient.seq.update({
         where: {
            id: training.id
         },
         data: {
            last_squence: training.last_squence
         }
      });

      const kodeTraining = akademi.toUpperCase() +
         (new Date().getFullYear() + '') +
         ((training.last_squence + 1000) + '').substring((training.last_squence + 1000 + '').length - 3);

      console.log("\n" + kodeTraining + "\n");
      return kodeTraining;
   }

}