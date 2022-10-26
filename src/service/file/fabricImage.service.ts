import { AppDataSource } from '../../app/database'
import FabricImage from '../../entity/FabricImage'

class FabricImageService {
  private repository = AppDataSource.getRepository(FabricImage)
  private readonly tableName = 'fabric_image_tb'

  async deleteFabricImage(fabricId: string, imageName: string) {
    const result = await this.repository.delete({ fabricId, imageName })
    return result
  }
}

export default FabricImageService
