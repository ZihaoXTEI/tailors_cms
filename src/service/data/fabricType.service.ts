import { AppDataSource } from '../../app/database'
import FabricType from '../../entity/FabricType'

class FabricTypeService {
  private fabricTypeRepository = AppDataSource.getRepository(FabricType)
}

export default new FabricTypeService()
