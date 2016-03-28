using Microsoft.Data.Entity.Metadata.Builders;

namespace React_DotNet.Server.Data.Mapping
{
    internal interface IMapper<T> where T : class
    {
        void GetMap(EntityTypeBuilder<T> map);
    }
}
