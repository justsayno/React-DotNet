using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_DotNet.Server.Data.Entities
{
    public interface IEntity<out TIdentifier> where TIdentifier : IEquatable<TIdentifier>
    {
        TIdentifier Id { get; }
    }
}
