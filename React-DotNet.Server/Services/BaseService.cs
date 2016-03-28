using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Query;
using React_DotNet.Server.Data;
using React_DotNet.Server.Data.Entities;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace React_DotNet.Server.Services
{
    public abstract class BaseService<TEntity> : IService<TEntity> where TEntity : class, IEntity<Guid>
    {
        #region Protected Members

        protected readonly ApplicationDbContext UoW;
        protected readonly DbSet<TEntity> PrimaryRepository;

        #endregion

        #region Ctor

        protected BaseService(ApplicationDbContext uoW, DbSet<TEntity> primaryRepository)
        {
            if (uoW == null)
                throw new NullReferenceException("Unit Of Work is NULL.");

            UoW = uoW;
            PrimaryRepository = primaryRepository;
        }

        #endregion

        #region Search

        public virtual IQueryable<TEntity> Search(Expression<Func<TEntity, Boolean>> where = null)
        {
            return Search<TEntity>(null, where);
        }

        public virtual IQueryable<TEntity> Search<T>(Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, T>> include, Expression<Func<TEntity, Boolean>> where = null)
        {
            IQueryable<TEntity> list = PrimaryRepository;

            if (include != null)
            {
                list = include(list);
            }

            if (where != null)
                list = list.Where(where);

            return list;
        }

        #endregion

        #region Get By Id

        public virtual async Task<TEntity> GetById(Guid id)
        {
            IQueryable<TEntity> item = PrimaryRepository;
            return await GetById<TEntity>(id, null);
        }

        public virtual async Task<TEntity> GetById<T>(Guid id, Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, T>> include)
        {
            IQueryable<TEntity> item = PrimaryRepository;
            if (include != null)
            {
                item = include(item);
            }

            return await item.SingleOrDefaultAsync(i => i.Id == id);
        }

        #endregion

        #region Exists

        public virtual async Task<Boolean> Exists(Guid id)
        {
            return (await GetById(id).ConfigureAwait(false)) != null;
        }

        #endregion

        #region Create

        public virtual async Task<Guid> Create(TEntity item, Boolean commit = true)
        {
            PrimaryRepository.Add(item);

            if (commit)
                await UoW.SaveChangesAsync();

            return item.Id;
        }

        #endregion

        #region Update

        public virtual async Task<Boolean> Update(TEntity item, Boolean commit = true)
        {
            PrimaryRepository.Update(item);
            return !commit || (await UoW.SaveChangesAsync()) > 0;
        }

        #endregion

        #region Delete

        public virtual async Task<Boolean> Delete(TEntity item, Boolean commit = true)
        {
            PrimaryRepository.Remove(item);

            return !commit || (await UoW.SaveChangesAsync()) > 0;
        }

        public virtual async Task<Boolean> DeleteById(Guid id, Boolean commit = true)
        {
            var item = await GetById(id).ConfigureAwait(false);
            return await Delete(item, commit);
        }

        #endregion

        public async Task<bool> SaveChanges(CancellationToken cancellationToken = default(CancellationToken))
        {
            return (await UoW.SaveChangesAsync(cancellationToken)) > 0;
        }
    }
}
