using Microsoft.Data.Entity.Metadata.Builders;
using React_DotNet.Server.Data.Entities;
using System;

namespace React_DotNet.Server.Data.Mapping
{
    internal abstract class Mapper<T> : IMapper<T> where T : class
    {
        internal virtual void GetMap(EntityTypeBuilder<T> map)
        {
            if (typeof(T).IsAssignableFrom(typeof(IEntity<Guid>)))
            {
                map.Property<Guid>("Id").IsRequired();
                map.HasKey("Id");
            }
        }

        void IMapper<T>.GetMap(EntityTypeBuilder<T> map)
        {
            GetMap(map);
        }

        internal static Action<EntityTypeBuilder<T>> Map<M>() where M : IMapper<T>
        {
            return Activator.CreateInstance<M>().GetMap;
        }
    }
}
