import { Injectable } from '@nestjs/common';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InspectionService {

  constructor(private prisma: PrismaService) { }


  async create(createInspectionDto: CreateInspectionDto) {
    try {
      const inspector = await this.prisma.inspector.findFirst({
        where: {
          persona: {
            email: createInspectionDto.inspectorEmail
          }
        },
        select: {
          id: true
        }
      })
      if (!inspector) {
        throw new Error("No se encontro el inspector")
      }

      return await this.prisma.inspection.create({
        data: {
          name: createInspectionDto.name,
          status: createInspectionDto.status,
          inspectorId: inspector?.id,
          usuarioId: createInspectionDto.userId,
          locationId: createInspectionDto.locationId
        },
        include: {
          inspector: true,
          usuario: {
            select: {
              persona: {
                select: {
                  name: true
                }
              }
            }
          },
          location: true
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    return await this.prisma.inspection.findMany({
      // include: {
      //   inspector: true,
      //   location: true,
      //   usuario: true
      // },
      select: {
        id: true,
        name: true,
        status: true,
        location: {
          select: {
            id: true,
            name: true
          }
        },
        usuario: {
          select: {
            persona: {
              select: {
                name: true,
                role: true,
                email: true
              }
            }
          }
        },
        inspector: {
          select: {

            persona: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });;
  }

  findOne(id: number) {
    return `This action returns a #${id} inspection`;
  }

  async update(id: number, updateInspectionDto: UpdateInspectionDto) {
    return this.prisma.inspection.update({
      where: {
        id: id
      },
      data: updateInspectionDto
    });
  }

  remove(id: number) {
    return this.prisma.inspection.delete({
      where: {
        id: id
      },
      select: {
        name: true
      }
    });
  }
}
