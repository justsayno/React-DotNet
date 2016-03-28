using Microsoft.Data.Entity.Query;
using React_DotNet.Server.Data.Entities;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace React_DotNet.Server.Services
{
    public interface IService<TEntity> where TEntity : class, IEntity<Guid>
    {

        IQueryable<TEntity> Search(Expression<Func<TEntity, bool>> where = null);

        IQueryable<TEntity> Search<T>(Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, T>> include,
            Expression<Func<TEntity, bool>> where = null);

        Task<TEntity> GetById(Guid id);

        Task<TEntity> GetById<T>(Guid id, Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, T>> include);
        Task<bool> Exists(Guid id);
        Task<Guid> Create(TEntity item, bool commit = true);
        Task<bool> Update(TEntity item,  bool commit = true);
        Task<bool> Delete(TEntity item, bool commit = true);
        Task<bool> DeleteById(Guid id,  bool commit = true);
        Task<bool> SaveChanges(CancellationToken cancellationToken = default(CancellationToken));
    }
}
